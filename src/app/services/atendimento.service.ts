import { Injectable } from '@angular/core';
import { SenhasService } from './senhas.service';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  // public painelChamadas: string[] = [
  //   '240425 - SG04',
  //   '240425 - SG03',
  //   '240425 - SP07',
  //   '240425 - SG02',
  //   '240425 - SP06',
  // ];
  public painelChamadas: string[] = [];
  private senhaAnterior: string | null = null;

  constructor(private senhasService: SenhasService) {}

  chamarProximaSenha(): string | null {
    const proximaSenha = this.selecionarProximaSenha();

    if (proximaSenha) {
      this.adicionarAoPainel(proximaSenha);
      this.senhaAnterior = proximaSenha;
      return proximaSenha;
    }
    console.log(this.painelChamadas);
    return null;
  }

  private selecionarProximaSenha(): string | null {
    const todasSenhas = this.senhasService.todasSenhas;

    if (todasSenhas.length > 0) {
      return todasSenhas.shift() || null;
    }

    return null;
  }

  private adicionarAoPainel(senha: string): void {
    this.painelChamadas.unshift(senha);
    if (this.painelChamadas.length > 6) {
      this.painelChamadas.pop();
    }
  }

  finalizarAtendimento(): void {
    console.log(`Atendimento finalizado para: ${this.senhaAnterior}`);
    this.senhaAnterior = null;
  }
}
