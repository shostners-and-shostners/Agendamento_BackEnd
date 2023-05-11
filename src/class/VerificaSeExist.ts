import { Repository } from 'typeorm';
import { Proprietarios } from './../proprietarios/entities/proprietarios.entity';
import { AlreadyExist } from 'src/exceptions/alreadyExist.exception';
export default class VerificaSeExiste {
  private JAEXISTE = 'Já cadastrado';
  async proprietarioJaExiste(repo: Repository<Proprietarios>, dto: any) {
    const msg: string[] = [];
    const achado = await repo.findOne({
      where: [
        { telefone: dto.telefone },
        { email: dto.email },
        { cpf: dto.cpf },
      ],
    });

    console.log(achado);

    if (achado) {
      if (achado.telefone == dto.telefone)
        msg.push(`Telefone ${this.JAEXISTE}`);
      if (achado.email.toLowerCase() == dto.email.toLowerCase())
        msg.push(`Email ${this.JAEXISTE}`);
      if (achado.cpf == dto.cpf) msg.push(`Cpf ${this.JAEXISTE}`);
      throw new AlreadyExist(msg);
    }
  }
}
