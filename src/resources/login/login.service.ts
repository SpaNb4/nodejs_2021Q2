import * as loginRepo from './login.memory.repository';

const getToken = async (jsonObj: any): Promise<any> => loginRepo.getToken(jsonObj);

export { getToken };
