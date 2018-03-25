
// Define TypeScript interface for service `comments`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// !<DEFAULT> code: nedb_interface
export interface Comment {
  id: number;
  uuid: number;
  authorUuid: number;
  postUuid: number;
  body: string;
  archived: number;
}
// !end

// !code: funcs // !end
// !code: end // !end
