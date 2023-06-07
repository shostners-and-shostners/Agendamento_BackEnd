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

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categRepo: Repository<Categoria>,
    @InjectRepository(Servico)
    private readonly servRepo: Repository<Servico>,
    @Inject(forwardRef(() => EstabelecimentoService))
    private readonly estabeServ: EstabelecimentoService,
  ) {}
  async criarCategoria(
    UID: string,
    dados: CreateCategoriaDto,
  ): Promise<Categoria> {
    let cat = await this.acharCategoriaPorNome(
      dados.UIDEstabelecimento,
      dados.nome,
    );
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

  async acharServico(id: number) {
    const serv = await this.servRepo.findOne({ where: { id: id } });
    if (!serv) throw new NotFoundException();
    return serv;
  }

  update(id: number, updateServicoDto: UpdateServicoDto) {
    return `This action updates a #${id} servico`;
  }

  remove(id: number) {
    return `This action removes a #${id} servico`;
  }
}
