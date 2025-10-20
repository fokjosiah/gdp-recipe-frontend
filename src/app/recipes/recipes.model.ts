export type RecipeDifficulty = "easy" | "medium" | "hard"

export interface Recipe {
  id: string,
  name: string,
  ingredients: string[],
  instructions: string,
  prep_time_mins: number,
  difficulty: RecipeDifficulty,
  favorite: boolean
}
