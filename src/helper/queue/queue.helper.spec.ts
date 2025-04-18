import { Queue } from "bullmq";
import { QueueHelper } from "./queue.helper";
import { container } from "tsyringe";

const queueAddMock = jest.fn();

jest.mock("bullmq", () => {
	return {
		Queue: jest.fn().mockImplementation(() => {
			return {
				add: queueAddMock,
			};
		}),
	};
});

jest.mock("../../config", () => ({
	REDIS_URL: "redis://some-redis-url:6379",
	LOG_LEVEL: "debug",
	CATALOG_DOWNLOAD_QUEUE_NAME: "catalog-download-queue",
}));

function makeSut() {
	const sut = container.resolve(QueueHelper);
	return { sut };
}

describe("QueueHelper", () => {
	it("calls Queue constructor", () => {
		makeSut();
		expect(Queue).toHaveBeenCalledWith("catalog-download-queue", {
			connection: { url: "redis://some-redis-url:6379" },
		});
	});

	it("call queue add method", async () => {
		const { sut } = makeSut();
		await sut.add("test", { test: "data" });
		expect(queueAddMock).toHaveBeenCalledWith(
			"test",
			{ test: "data" },
			{ attempts: 3 },
		);
		expect(queueAddMock).toHaveBeenCalledTimes(1);
	});
});
