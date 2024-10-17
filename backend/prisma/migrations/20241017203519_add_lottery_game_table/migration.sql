-- CreateTable
CREATE TABLE "lottery_game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "play_date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "lottery_game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lottery_game" ADD CONSTRAINT "lottery_game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
