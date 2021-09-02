import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter } from "rxjs/operators";
import { createPromoRangeValidator } from "../../validators/date-range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group(
    {
      courseType: ["premium", Validators.required],
      price: [
        0,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern("[1-9]+"),
        ],
      ],
      dateRangeStart: [null],
      dateRangeEnd: [null],
    },
    { validators: [createPromoRangeValidator()], updateOn: "blur" }
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    const draft = localStorage.getItem("STEP_2");

    if (draft) {
      const formValues = JSON.parse(draft);
      this.form.patchValue({
        courseType: formValues.courseType,
        price: formValues.price,
        dateRangeStart: new Date(formValues.dateRangeStart),
        dateRangeEnd: new Date(formValues.dateRangeEnd)
      });
    }

    this.form.valueChanges.subscribe((value) => {

      const priceControl = this.form.controls["price"];
      if (value.courseType === "free" && priceControl.enabled) {
        // this.form.patchValue({price: 0}, {emitEvent: false})
        priceControl.disable({ emitEvent: false }); //Prevent infinte loop
      } else if (value.courseType === "premium" && priceControl.disabled) {
        priceControl.enable();
      }

      localStorage.setItem("STEP_2", JSON.stringify(value));

    });
  }
}
