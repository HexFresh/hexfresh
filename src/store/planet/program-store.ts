import { createModel } from '@rematch/core';
import { IPhase } from '../../interface/program-interface';
import { TaskCategory, TaskStatus } from '../../utilities/enum-utils';
import { IRootDispatch, IRootStore } from '../store';

type IProgramStore = {
  selectedProgram: IPhase;
  programs: IPhase[];
}


export const programStore:any = createModel<IRootStore>()( {
  state: {
    programs: [
      {
        id: 'abcd1',
        name: 'First onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119224/hexfresh/planet-01_f7oul0.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd2',
        name: 'Second onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119226/hexfresh/planet-02_qjswvd.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd3',
        name: 'Third onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119221/hexfresh/planet-03_wfwlsb.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd4',
        name: 'Fourth onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-10_gge1rp.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd5',
        name: 'Fifth onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-11_elryxm.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd6',
        name: 'Sex onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-09_jvied4.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd7',
        name: 'Seven onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-07_luxrbe.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd8',
        name: 'Eight onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-05_rfn7ee.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd9',
        name: 'Nine onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-06_vu4km7.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd10',
        name: 'Tenth onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119226/hexfresh/planet-02_qjswvd.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd11',
        name: 'Eleven onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119225/hexfresh/planet-14_grmwxo.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd12',
        name: 'Twelfth onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-15_v6ehro.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd13',
        name: 'Thirteen onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-04_wnbcyx.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd14',
        name: 'Fourteen onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-12_qsd428.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks11',
                name: 'Upload your Household Booklet ',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks12',
                name: 'Upload your crime record',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
              },
              {
                id: 'tks13',
                name: 'Provide your banking infor',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
              }
            ]
          },
        ]
      },
      {
        id: 'abcd15',
        name: 'Fifteen onboarding',
        imageSrc: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-13_kg6vpd.png',
        checklists: [
          {
            id: 'ck1',
            name: "Update your profile",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
          {
            id: 'ck2',
            name: "Update your detail information",
            tasks: [
              {
                id: 'tks1',
                name: 'Update your profile picture',
                type: TaskCategory.ASSIGNMENT,
                taskStatus: TaskStatus.DONE,
              },
              {
                id: 'tks2',
                name: 'What are the e wallets?',
                type: TaskCategory.MULTIPLE_CHOICES,
                taskStatus: TaskStatus.DOING,
                choices: [{
                  choiceId: 'choice1',
                  content: 'ZaloPay',
                  //isRight: true,
                },
                {
                  choiceId: 'choice2',
                  content: 'Momo',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Shopee',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: 'Paypall',
                  //isRight: true,
                }],
              },
              {
                id: 'tks3',
                name: 'What is the University of Science\'s main campus adderss?',
                type: TaskCategory.SINGLE_CHOICE,
                taskStatus: TaskStatus.TODO,
                choices: [{
                  choiceId: 'choice1',
                  content: '22 Nuyen Van Cu, D.5.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice2',
                  content: '227 Nguyen Van Cu Street, D.5',
                  //isRight: true,
                },
                {
                  choiceId: 'choice3',
                  content: 'Linh Trung, Thu Duc City.',
                  //isRight: false,
                },
                {
                  choiceId: 'choice4',
                  content: '546 Ngo Gia TU Street, D.5',
                  //isRight: true,
                }],
              }
            ]
          },
        ]
      },
    ],
    selectedProgram:
    {
      id: 'abcd',
      name: 'First onboarding',
      imageSrc:'https://res.cloudinary.com/droruloek/image/upload/v1643119224/hexfresh/planet-01_f7oul0.png',
      checklists: [
        {
          id: 'ck1',
          name: "Update your profile",
          tasks: [
            {
              id: 'tks1',
              name: 'Update your profile picture',
              type: TaskCategory.ASSIGNMENT,
              taskStatus: TaskStatus.DONE,
              choices:[],
            },
            {
              id: 'tks2',
              name: 'What are the e wallets?',
              type: TaskCategory.MULTIPLE_CHOICES,
              taskStatus: TaskStatus.DOING,
              choices: [{
                choiceId: 'choice1',
                content: 'ZaloPay',
                //isRight: true,
              },
              {
                choiceId: 'choice2',
                content: 'Momo',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Shopee',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: 'Paypall',
                //isRight: true,
              }],
            },
            {
              id: 'tks3',
              name: 'What is the University of Science\'s main campus adderss?',
              type: TaskCategory.SINGLE_CHOICE,
              taskStatus: TaskStatus.TODO,
              choices: [{
                choiceId: 'choice1',
                content: '22 Nuyen Van Cu, D.5.',
                //isRight: false,
              },
              {
                choiceId: 'choice2',
                content: '227 Nguyen Van Cu Street, D.5',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Linh Trung, Thu Duc City.',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: '546 Ngo Gia TU Street, D.5',
                //isRight: true,
              }],
            }
          ]
        },
        {
          id: 'ck2',
          name: "Update your detail information",
          tasks: [
            {
              id: 'tks11',
              name: 'Upload your Household Booklet ',
              type: TaskCategory.ASSIGNMENT,
              taskStatus: TaskStatus.DONE,
              choices: [{
                choiceId: 'choice1',
                content: '22 Nuyen Van Cu, D.5.',
                //isRight: false,
              },
              {
                choiceId: 'choice2',
                content: '227 Nguyen Van Cu Street, D.5',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Linh Trung, Thu Duc City.',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: '546 Ngo Gia TU Street, D.5',
                //isRight: true,
              }],
            },
            {
              id: 'tks12',
              name: 'Upload your crime record',
              type: TaskCategory.MULTIPLE_CHOICES,
              taskStatus: TaskStatus.DOING,
              choices: [{
                choiceId: 'choice1',
                content: '22 Nuyen Van Cu, D.5.',
                //isRight: false,
              },
              {
                choiceId: 'choice2',
                content: '227 Nguyen Van Cu Street, D.5',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Linh Trung, Thu Duc City.',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: '546 Ngo Gia TU Street, D.5',
                //isRight: true,
              }],
            },
            {
              id: 'tks13',
              name: 'Provide your banking infor',
              type: TaskCategory.SINGLE_CHOICE,
              taskStatus: TaskStatus.TODO,
              choices: [{
                choiceId: 'choice1',
                content: '22 Nuyen Van Cu, D.5.',
                //isRight: false,
              },
              {
                choiceId: 'choice2',
                content: '227 Nguyen Van Cu Street, D.5',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Linh Trung, Thu Duc City.',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: '546 Ngo Gia TU Street, D.5',
                //isRight: true,
              }],
            }
          ]
        },
      ]
    } ,
  }as IProgramStore,
  reducers: {
    setSelectedProgram: (state: IProgramStore, payload: IPhase) => ({ ...state, selectedProgram: payload }),
  },
  effects: (dispatch: IRootDispatch) => ({
    /* async doFetchProgram(payload: IPhase) {
      console.log(payload,)
      dispatch.setSelectedProgram({});
    } */
  }),

});

