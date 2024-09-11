import { AddThreadModel } from "../../../domain/usecases/add-thread";

export interface ThreadAdder {
  add(thread: AddThreadModel): Promise<string>
}