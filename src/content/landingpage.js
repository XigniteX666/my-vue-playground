import createContentClient from '@/utils/content'

export const HOME = '6x2OfdOIEw6QYE0wEiQymu';
export const ABOUT = '1mnBoB9OyU8IaCmQKi4Esm';

const client = createContentClient();

export class LandingPage {
    constructor({
      id = null,
      intro = '',
      title = '',
      text = ''
    } = {}) {
      this.id = id;
      this.intro = intro;
      this.title = title;
      this.text = text;
    }
  }

// We use an adapter to bring the API response
// from the Contentful API into the correct format
// for our LandingPage class.
export function responseAdapter({ fields, sys }) {
    console.log(sys);
    console.log(fields);
    return new LandingPage({ ...fields, ...sys });
}
  
 // We wrap the Contentful API client to format
 // the response exactly the way we like it.
 export default {
    async get(id) {
      return responseAdapter(await client.getEntry(id));
    },
  };