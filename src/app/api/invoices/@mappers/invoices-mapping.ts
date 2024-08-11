// import { generateDocumentUrl, generateImageUrl } from "@/helpers/url";
// import {} from "@prisma/client";

// type Document = PeopleDocument & {
//   document: DocumentPrisma;
// };

// type Questionnaire = InterviewQuestionnairePrisma & {
//   questionnaire: QuestionnairePrisma;
// };

// type Interviews = InterviewPrisma & {
//   questionnaires?: Questionnaire[];
// };

// type Application = ApplicationPrisma & {
//   people: PeoplePrisma & {
//     company: CompanyPrisma;
//     nationality: NationalityPrisma;
//     naturalness: NaturalnessPrisma;
//     province: ProvincePrisma;
//     documents: Document[];
//     phones: PhonePrisma[];
//     children: ChildrenPrisma[];
//     relatives: RelativePrisma[];
//     position: PositionPrisma;
//   };
//   interviews?: Interviews;
// };

// export function applicationToResponseMapping(raw: Partial<Application>) {
//   const documents = raw.people?.documents
//     ? raw.people.documents.map((doc) => ({
//         id: doc.id,
//         name: doc.document.name,
//         expirationDate: doc.expirationDate,
//         fileName: doc.fileName,
//         fileSize: doc.fileSize,
//         originalFileName: doc.originalFileName,
//         url: generateDocumentUrl(doc.fileName),
//       }))
//     : [];

//   const interviews = raw.interviews
//     ? {
//         id: raw.interviews.id,
//         markingDate: raw.interviews.markingDate,
//         completionDate: raw.interviews.completionDate,
//         status: raw.interviews.status,
//         questionnaires: raw.interviews.questionnaires?.map(
//           ({ answer, questionnaire }) => ({
//             id: questionnaire.id,
//             question: questionnaire.question,
//             answer: answer,
//           })
//         ),
//       }
//     : undefined;

//   return {
//     id: raw.peopleId,
//     photo: raw.people?.photo
//       ? generateImageUrl(raw.people.photo)
//       : raw.people?.photo,
//     name: raw.people?.name,
//     nickname: raw.people?.nickname,
//     gender: raw.people?.gender,
//     height: raw.people?.height,
//     dateBirth: raw.people?.dateBirth,
//     fatherName: raw.people?.fatherName,
//     motherName: raw.people?.motherName,
//     nationality: raw.people?.nationality,
//     naturalness: raw.people?.naturalness,
//     province: raw.people?.province,
//     currentResidence: raw.people?.currentResidence,
//     maritalStatus: raw.people?.maritalStatus,
//     identification: raw.people?.identification,
//     phones: raw.people?.phones,
//     spouseName: raw.people?.spouseName,
//     children: raw.people?.children,
//     relatives: raw.people?.relatives,
//     company: raw.people?.company,
//     position: raw.people?.position,
//     documents,
//     interviews,
//     status: raw.status,
//   };
// }

// export function applicationToListResponseMapping(raw: any) {
//   return {
//     id: raw.peopleId,
//     photo: raw.people?.photo
//       ? generateImageUrl(raw.people.photo)
//       : raw.people?.photo,
//     name: raw.people?.name,
//     nickname: raw.people?.nickname,
//     identification: raw.people?.identification,
//     position: raw.people?.position,
//     status: raw.status,
//   };
// }
