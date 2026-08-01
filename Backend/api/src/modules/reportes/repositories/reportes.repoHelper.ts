import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class ReportesRepoHelper {
  aplicarPaginacion(
    query: Knex.QueryBuilder,
    page: number,
    limit: number,
  ): Knex.QueryBuilder {
    const pagina = Number(page) > 0 ? Number(page) : 1;
    const limite = Number(limit) > 0 ? Number(limit) : 5;
    const offset = (pagina - 1) * limite;

    return query.limit(limite).offset(offset);
  }
}