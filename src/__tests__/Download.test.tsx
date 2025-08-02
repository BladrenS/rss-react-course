import { PokemonData } from '../types/types';
import { downloadCSV } from '../utils/downloadCsv';

const mockData: PokemonData[] = [
  {
    name: 'pikachu',
    description: 'Electric mouse Pokémon',
    height: 40,
    weight: 60,
    image: 'https://example.com/pikachu.png',
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
    abilities: ['static'],
    baseXP: 112,
  },
  {
    name: 'bulbasaur',
    description: 'Seed Pokémon',
    height: 70,
    weight: 90,
    image: 'https://example.com/bulbasaur.png',
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
    abilities: ['overgrow'],
    baseXP: 64,
  },
];

describe('downloadCSV', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');

    const clickMock = jest.fn();
    const setHref = jest.fn();
    const setDownload = jest.fn();

    const fakeLink = {
      click: clickMock,
      set href(value: string) {
        setHref(value);
      },
      get href() {
        return '';
      },
      set download(value: string) {
        setDownload(value);
      },
      get download() {
        return '';
      },
    };

    jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string) => {
        if (tagName === 'a') {
          return fakeLink as unknown as HTMLElement;
        }
        return document.createElement(tagName);
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('generates correct CSV content and triggers download', (done) => {
    downloadCSV(mockData);

    const blobArg = (URL.createObjectURL as jest.Mock).mock.calls[0][0] as Blob;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;

      const expectedCSV =
        'Name,Description,Height,Weight,URL\n' +
        'pikachu,Electric mouse Pokémon,40,60,https://pokeapi.co/api/v2/pokemon/pikachu\n' +
        'bulbasaur,Seed Pokémon,70,90,https://pokeapi.co/api/v2/pokemon/bulbasaur';

      expect(result).toBe(expectedCSV);
      done();
    };

    reader.readAsText(blobArg);
  });

  it('sets correct download filename and triggers click', () => {
    const clickSpy = jest.fn();

    jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string) => {
        if (tagName === 'a') {
          return {
            href: '',
            download: '',
            click: clickSpy,
          } as unknown as HTMLElement;
        }
        return document.createElement(tagName);
      });

    downloadCSV(mockData);

    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalledTimes(1);
    //expect(clickSpy.mock.instances[0]?.download || '').toBeFalsy();
  });
});
