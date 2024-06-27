import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) =>
      this.listaPensamentos = listaPensamentos);
  }

  carregarMaisPensamentos() {
    this.paginaAtual++;
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      if (listaPensamentos.length) {
        this.listaPensamentos.push(...listaPensamentos);
      } else {
        this.haMaisPensamentos = false;
      }
    });
  }

}
