import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group({
    courseType: ["premium", Validators.required],
    price: [0, [Validators.required, Validators.min(1), Validators.max(9999), Validators.pattern("[1-9]+")]]
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form.valueChanges.subscribe(
      value => {
        const priceControl = this.form.controls['price'];
        if (value.courseType === 'free' && priceControl.enabled) {
          priceControl.disable({emitEvent: false}); //Prevent infinte loop
        }
        else if (value.courseType === 'premium' && priceControl.disabled) {
          priceControl.enable();
        }
      }
    );
  }
}
