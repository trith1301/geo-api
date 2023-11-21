-- CreateTable
CREATE TABLE "place" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "place_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL,
    "place_types" VARCHAR(255)[],
    "create_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3),

    CONSTRAINT "place_pkey" PRIMARY KEY ("id")
);
