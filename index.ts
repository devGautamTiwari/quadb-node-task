import path from "path";
import express from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import axios from "axios";
import routes from "./routes";
import { authenticateSequelize, getConnection } from "./database/connect";
import TopTickers from "./database/models/TopTickers";

dotenvExpand.expand(dotenv.config());

const app = express();
const port = 3000;
const env = process.env.NODE_ENV || "development";

const sequelize = getConnection(
	process.env.POSTGRES_CONNECTION_STRING as string
);

authenticateSequelize(sequelize)
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

axios
	.post("http://localhost:3000/api/top-tickers")
	.then((response) => {
		const TopTickersModel = TopTickers(sequelize);
		// console.log(response.data);

		TopTickersModel.sync({force: true}).then(() => {
			console.log("Table synced successfully");

			TopTickersModel.bulkCreate(response.data, {
				validate: true,
				fields: ["name", "last", "buy", "sell", "volume", "base_unit"],
			})
				.then(() => {
					console.log("Data inserted successfully");
					sequelize.close();
				})
				.catch((error) => {
					console.error(
						"Unable to insert data into the database:",
						error
					);
				});
		});
	})
	.catch((error) => {
		console.error("Unable to fetch data from the API:", error);
	});

// if in development environment add live reload or hot reload in the browser
if (env === "development") {
	const livereload = require("livereload");
	const connectLivereload = require("connect-livereload");

	// open livereload high port and start to watch public directory for changes
	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch(path.join(__dirname, "public"));

	// ping browser on Express boot, once browser has reconnected and handshaken
	liveReloadServer.server.once("connection", () => {
		setTimeout(() => {
			liveReloadServer.refresh("/");
		}, 100);
	});
	app.use(connectLivereload());
}

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
