import {
  Inject,
  Injectable,
  forwardRef,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { Servico } from './entities/servico.entity';
import { plainToClass } from 'class-transformer';
import { FuncionarioService } from 'src/funcionario/funcionario.service';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categRepo: Repository<Categoria>,
    @InjectRepository(Servico)
    private readonly servRepo: Repository<Servico>,
    @Inject(forwardRef(() => EstabelecimentoService))
    private readonly estabeServ: EstabelecimentoService,
    @Inject(forwardRef(() => FuncionarioService))
    private readonly funcServ: FuncionarioService,
  ) {}

  async criarCategoria(
    UID: string,
    dados: CreateCategoriaDto,
  ): Promise<Categoria> {
    console.log(dados);
    let cat = await this.acharCategoriaPorNome(UID, dados.nome);

    if (!cat) {
      dados.UIDEstabelecimento = UID;
      cat = await this.categRepo.save(dados);
    }

    return cat;
  }

  async criarServico(dados: CreateServicoDto) {
    await this.estabeServ.pegarPorUiDD(dados.UIDEstabelecimento);

    const cat = await this.criarCategoria(
      dados.UIDEstabelecimento,
      dados.categoria,
    );

    const novoServ = this.servRepo.create(dados);
    novoServ.categoria = cat;
    return await this.servRepo.save(novoServ);
  }

  async editarServico(id: number, dados: UpdateServicoDto) {
    await this.estabeServ.pegarPorUiDD(dados.UIDEstabelecimento);

    const serv = this.acharServico(id);

    const cat = await this.criarCategoria(
      dados.UIDEstabelecimento,
      dados.categoria,
    );
    dados.categoria = cat;
    await this.servRepo.update(id, dados);
    return this.acharServico(id);
  }

  async acharCategoriaPorNome(UID: string, nome: string): Promise<Categoria> {
    const cat = await this.categRepo.findOne({
      where: {
        UIDEstabelecimento: UID,
        nome: nome,
      },
    });
    return cat;
  }
  async acharCategoriaPorId(id: number): Promise<Categoria> {
    const cat = await this.categRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!cat) throw new NotFoundException('Categoria não existe');
    return cat;
  }

  async acharServico(id: number) {
    const serv = await this.servRepo.findOne({ where: { id: id } });
    if (!serv)
      throw new NotFoundException(`Serviço com o id: ${id} não encontrado `);
    return serv;
  }

  async pegarTodos() {
    return await this.servRepo.find({ relations: ['categoria'] });
  }

  async pegarTodasCatego(uid: string) {
    return await this.categRepo.find({ where: { UIDEstabelecimento: uid } });
  }

  async pegarTodosServCat(id: number) {
    const cat = await this.acharCategoriaPorId(id);
    return await this.servRepo.find({ where: { categoria: cat } });
  }

  async pegarTodosServ(uid: string) {
    return await this.servRepo.find({
      relations: ['categoria'],
      where: { UIDEstabelecimento: uid },
    });
  }

  async pegarFuncionarios(id: number) {
    return await this.funcServ.funcionarioPorServico(id);
  }
}
