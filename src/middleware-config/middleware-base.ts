import { NextRequest, NextResponse } from "next/server";

export abstract class MiddlewareBase {
  constructor(protected readonly req: NextRequest) {}

  /**
   * Path url untuk middleware ini di eksekusi
   */
  protected abstract readonly path: string;

  /**
   * Aksi middleware
   */
  protected abstract action(): Promise<undefined | NextResponse>;

  public async execute(): Promise<undefined | NextResponse> {
    if (this.req.nextUrl.pathname === this.path) {
      return await this.action();
    }
  }
}