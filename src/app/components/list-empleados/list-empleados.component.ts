import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(private _empleadoService: EmpleadoService) {
  }

  ngOnInit(): void {
    this.getEmpleados();
  }
  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element:any)=> {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados)
    })
  }
  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('Empleado eliminado correctamente')
    }).catch(err => {
      console.log(err)
    })
  }
}
