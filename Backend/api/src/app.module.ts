import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { ProductosModule } from './modules/productos/productos.module';
import { TokenGuard } from './guards/token.guard';
import { ComprasModule } from './modules/compras/compras.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { ReportesModule } from './modules/reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProductosModule,
    ComprasModule,
    VentasModule,
    ReportesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}