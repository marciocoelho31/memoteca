import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../minusculoValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          minusculoValidator
        ])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito],
        id: [pensamento.id]
      });
    });
  }

  editarPensamento() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamentos']);
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamentos']);
  }

  habilitarBotao(): string{
    if(this.formulario.valid){
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
