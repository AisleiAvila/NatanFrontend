import { Component } from "@angular/core";

@Component({
  selector: "app-terms-dialog",
  template: `
    <div class="terms-dialog-container">
      <h1>Termos de Serviço</h1>
      <p>
        Estes são os Termos de Serviço da Natan Construtora. Por favor, leia
        atentamente antes de utilizar nossos serviços.
      </p>
      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar ou usar nossos serviços, você concorda com estes termos. Se
        não concordar, por favor, não utilize nossos serviços.
      </p>
      <h2>2. Uso dos Serviços</h2>
      <p>
        Você concorda em usar nossos serviços apenas para fins legais e de
        acordo com estes termos.
      </p>
      <h2>3. Alterações</h2>
      <p>
        Podemos atualizar estes termos periodicamente. Recomendamos que revise
        esta página regularmente.
      </p>
      <h2>4. Contato</h2>
      <p>
        Em caso de dúvidas, entre em contato pelo e-mail:
        contato&#64;natanconstrutora.com
      </p>
    </div>
  `,
  styles: [
    `
      .terms-dialog-container {
        max-width: 700px;
        padding: 24px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
      }
      .terms-dialog-container h1 {
        color: #1976d2;
        margin-bottom: 1.5rem;
      }
      .terms-dialog-container h2 {
        color: #333;
        margin-top: 2rem;
        margin-bottom: 0.5rem;
      }
      .terms-dialog-container p {
        color: #444;
        margin-bottom: 1rem;
        line-height: 1.6;
      }
    `,
  ],
})
export class TermsDialogComponent {}
