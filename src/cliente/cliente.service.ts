import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import Hashing from 'src/class/hashing';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { AlreadyExist } from 'src/exceptions/alreadyExist.exception';
import { AgendamentoService } from 'src/agendamento/agendamento.service';
import { DatasDto } from 'src/agendamento/dto/datas.dto';
import { deleteFile } from 'src/class/file-upload.utils';
import { locationImgCliente } from 'src/class/strings';

@Injectable()
export class ClienteService {
  hash: Hashing;
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @Inject(EstabelecimentoService)
    private readonly estabService: EstabelecimentoService,
    @Inject(forwardRef(() => AgendamentoService))
    private readonly agendaServ: AgendamentoService,
  ) {
    this.hash = new Hashing();
  }

  async create(dados: CreateClienteDto) {
    const cli = await this.buscarPorEmail(
      dados.UIDEstabelecimento,
      dados.email,
    );
    if (cli) throw new AlreadyExist('Email já existe para estabelecimento');
    dados.senha = await this.hash.hashPass(dados.senha);
    const novoCliente = this.clienteRepo.create(dados);
    const clienteCriado = await this.clienteRepo.save(novoCliente);
    return clienteCriado;
  }

  async createAnoni(dados: CreateClienteDto) {
    const novoCliente = this.clienteRepo.create(dados);
    const clienteCriado = await this.clienteRepo.save(novoCliente);
    return clienteCriado;
  }

  async buscarPorEmail(uid: string, email: string) {
    console.log('uid:' + uid);
    await this.estabService.pegarPorUiDD(uid);
    const cliente = await this.clienteRepo.findOne({
      where: { email: email, UIDEstabelecimento: uid },
    });
    return cliente;
  }
  async verificaSeExisteEmail(uid: string, email: string) {
    const cliente = await this.buscarPorEmail(uid, email);
    if (!cliente)
      throw new HttpException(
        'Cliente não existe para esse estabelecimento',
        404,
      );
    return cliente;
  }

  async update(id: number, dados: UpdateClienteDto) {
    await this.verificaSeExisteId(id);
    await this.clienteRepo.update(id, dados);
    return await this.verificaSeExisteId(id);
  }

  async verificaSeExisteId(id: number) {
    const cliente = await this.clienteRepo.findOne({
      where: { id },
    });

    if (!cliente) throw new HttpException('Cliente não existe', 404);
    return cliente;
  }

  async todosDeUmEstabelicimento(uid: string) {
    await this.estabService.pegarPorUiDD(uid);
    const clientes = await this.clienteRepo.find({
      where: { UIDEstabelecimento: uid },
    });
    return clientes;
  }

  async pegarAgendamentosDoClie(id: number, datas: DatasDto) {
    return await this.agendaServ.todosDoClie(id, datas);
  }

  async colocarAvatar(uid: number, file: Express.Multer.File) {
    const cliente = await this.verificaSeExisteId(uid);
    console.log('Teste');
    if (file) {
      if (cliente.urlFoto != 'userAvatar.png')
        deleteFile(locationImgCliente + cliente.urlFoto);

      cliente.urlFoto = file.filename;
      await this.clienteRepo.update(cliente.id, cliente);
      return cliente;
    } else {
      throw new HttpException(
        { msg: 'Arquivo não foi enviado corretamente ' },
        400,
      );
    }
  }
}
