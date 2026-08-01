import { SetMetadata } from '@nestjs/common';

export const REQUIERE_TOKEN_KEY = 'requiere_token';

export const RequiereToken = () => SetMetadata(REQUIERE_TOKEN_KEY, true);