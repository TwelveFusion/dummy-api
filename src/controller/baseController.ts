// baseController.ts

import { Request, Response } from 'express';
import { readJsonFile, writeJsonFile } from '../util/jsonUtil';

export interface BaseModel {
  id: number;
}

export interface BaseController<T extends BaseModel> {
  getAll: (req: Request, res: Response) => Promise<void>;
  getById: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  updateById: (req: Request, res: Response) => Promise<void>;
  deleteById: (req: Request, res: Response) => Promise<void>;
  resetRoute?: (req: Request, res: Response) => Promise<void>;
}

export class GenericController<T extends BaseModel> implements BaseController<T> {
  protected data: T[] = [];
  protected fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadData();
  }

  private loadData() {
    this.data = readJsonFile(this.fileName);
  }

  private writeData() {
    writeJsonFile(this.fileName, this.data);
  }

  public getAll = async (req: Request, res: Response) => {
    res.json(this.data);
  };

  public getById = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id, 10);
    const item = this.data.find((d) => d.id === itemId);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const newItem = req.body as T;

    if (!newItem) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    newItem.id = this.data.length + 1;
    this.data.push(newItem);

    this.writeData();

    res.status(201).json(newItem);
  };

  public updateById = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id, 10);
    const updatedItem = req.body as T;

    const itemIndex = this.data.findIndex((d) => d.id === itemId);

    if (itemIndex !== -1) {
      this.data[itemIndex] = { ...this.data[itemIndex], ...updatedItem };

      this.writeData();

      res.json(this.data[itemIndex]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  };

  public deleteById = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id, 10);

    this.data = this.data.filter((d) => d.id !== itemId);

    this.writeData();

    res.json({ message: 'Item deleted successfully' });
  };

  // Optional reset route, can be overridden in child classes
  public resetRoute = async (req: Request, res: Response) => {
    res.status(404).json({ message: 'Reset route not implemented' });
  };
}