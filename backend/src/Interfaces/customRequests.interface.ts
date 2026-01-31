
export class customRequest extends Request {
  cookies?: any;
  user: {
    id: number;
    username: string;
    email: string;
  } | undefined;
}
