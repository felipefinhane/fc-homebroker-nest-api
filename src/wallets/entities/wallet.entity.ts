import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { AssetDocument } from 'src/assets/entities/asset.entity';
import { WalletAsset } from './wallet-asset.entity';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop()
  amount: number;

  @Prop({
    type: [mongoose.Schema.Types.String],
    set: (v) => [...new Set(v)], //Evita que traga registros duplicados
    ref: WalletAsset.name
  })
  assets: AssetDocument[] | string[]

  createAt!: Date;
  updateAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
