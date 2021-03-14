export interface IResult {
  imageSrc: string;
  imageAlt: string;
  voteNumber: number | null;
  candidateHeading: string;
}

export interface IVoteResultResponse {
  joeBidenVote: number | null;
  donaldTrumpVote: number | null;
}
