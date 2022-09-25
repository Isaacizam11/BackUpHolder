import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() data!: any[];
  @ContentChild("headers") headers: TemplateRef<any> | undefined;
  @ContentChild("rows") rows: TemplateRef<any> | undefined;
  public query: any = '';
  constructor() {}

  ngOnInit() {}
}
