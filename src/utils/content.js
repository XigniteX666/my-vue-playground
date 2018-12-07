import { createClient } from 'contentful';

const config = {
  space: 'bmgpkcvambf6',
  accessToken: '45e171190ff03c59b4761285655c00d30ea2f451f8683391c81f914101295f0f'
}

export default function createContentClient(){
  return createClient(config) ;
}