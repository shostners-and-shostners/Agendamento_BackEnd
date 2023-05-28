import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import fs = require('fs');

const removeAcento = (text) => {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  return text;
};

export const editFileName = (req, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0].trim();
  const extName = extname(file.originalname);
  const random = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  const nameExt = `${removeAcento(name)}${random}${extName}`
    .replace(/\s/g, '')
    .replace(/[#@%$!*&^]/g, '')
    .replace(' ', '')
    .toLowerCase();
  callback(null, nameExt);
};

export const renameFileName = (file: Express.Multer.File) => {
  const name = file.originalname.split('.')[0].trim();
  const extName = extname(file.originalname);
  const random = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const nameExt = `${name}${random}${extName}`
    .replace(/\s/g, '')
    .replace(/[#@%$!*&^]/g, '')
    .toLowerCase();
  return nameExt;
};
export const collectFileName = (req, file: Express.Multer.File, callback) => {
  //const name = file.originalname.split('.')[0].trim();
  const extName = extname(file.originalname);
  const random = Array(12)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const nameExt = `${Date.now()}${random}${extName}`;
  callback(null, nameExt);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        'Arquivo precisa ser uma imagem',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      ),
      false,
    );
  }
  callback(null, true);
};

export function deleteFile(path: string) {
  try {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else console.log('arquivo deletado');
    });
  } catch (err) {
    console.log(err);
  }
}
export function moveFile(path1: string, path2: string) {
  try {
    fs.rename(path1, path2, (err) => {
      if (err) {
        console.log(err);
      } else console.log('arquivo movido');
    });
  } catch (err) {
    console.log(err);
  }
}

export function copyFile(path1: string, path2: string) {
  try {
    fs.copyFile(path1, path2, (err) => {
      if (err) {
        console.log(err);
      } else console.log('arquivo copiado');
    });
  } catch (err) {
    console.log(err);
  }
}
