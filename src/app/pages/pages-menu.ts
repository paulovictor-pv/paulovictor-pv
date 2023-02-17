import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Grupos',
    icon: 'people-outline',
    expanded: false,
    children:[
      {title:'Criar Grupo',
      link: '/pages/grupos',
      icon: 'file-text-outline',
      },
      {title:'Grupos Criados',
      link: '/pages/gruposCriados',
      icon: 'layers-outline',
      },
      {title:'Participação',
      link: '/pages/participacoes',
      icon: 'person-done-outline',
      }
    ]
  },
  {
    title: 'Configurações',
    icon: 'settings-2',
    expanded: false,
    children:[
      {title:'Criar Pessoas',
      link: '/pages/configuracoes',
      icon: 'plus-circle-outline',
      },
    ]
  },
];
