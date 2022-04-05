interface IFresher {
  id: string;
  username: string;
  program: string;
  percent: number;
  date: string;
  status: string;
}

export const listFresher: IFresher[] = [
  {
    id: '1',
    username: 'Nguyễn Văn A',
    program: 'Công nghệ thông tin',
    percent: 80,
    date: '20/10/2019',
    status: 'completed',
  },
  {
    id: '2',
    username: 'Nguyễn Văn B',
    program: 'Công nghệ thông tin',
    percent: 70,
    date: '20/10/2019',
    status: 'completed',
  },
  {
    id: '3',
    username: 'Nguyễn Văn C',
    program: 'Công nghệ thông tin',
    percent: 60,
    date: '20/10/2019',
    status: 'on-going',
  },
  {
    id: '4',
    username: 'Nguyễn Văn D',
    program: 'Công nghệ thông tin',
    percent: 50,
    date: '20/10/2019',
    status: 'completed',
  },
  {
    id: '5',
    username: 'Nguyễn Văn E',
    program: 'Công nghệ thông tin',
    percent: 40,
    date: '20/10/2019',
    status: 'on-going',
  },
  {
    id: '6',
    username: 'Nguyễn Văn F',
    program: 'Công nghệ thông tin',
    percent: 30,
    date: '20/10/2019',
    status: 'on-going',
  },
  {
    id: '7',
    username: 'Nguyễn Văn G',
    program: 'Công nghệ thông tin',
    percent: 20,
    date: '20/10/2019',
    status: 'on-going',
  },
  {
    id: '8',
    username: 'Nguyễn Văn H',
    program: 'Công nghệ thông tin',
    percent: 20,
    date: '20/10/2019',
    status: 'on-going',
  },
];

export const getFreshers = async (keyword: string, limit: number, offset: number) => {
  const result = listFresher.filter((fresher) => fresher.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
  const data = result.slice(offset, offset + limit);
  const count = result.length;
  return {
    data,
    count,
  };
};
