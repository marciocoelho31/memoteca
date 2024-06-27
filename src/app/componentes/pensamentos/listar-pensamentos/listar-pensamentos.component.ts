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
  filtro: string = '';

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) =>
      this.listaPensamentos = listaPensamentos);
  }

  carregarMaisPensamentos() {
    this.paginaAtual++;
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) => {
      if (listaPensamentos.length) {
        this.listaPensamentos.push(...listaPensamentos);
      } else {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos() {

    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      }
    );

  }

}
