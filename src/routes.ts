import { EpisodeController } from "./controller/EpisodeController";
import { CommentController } from "./controller/CommentController";
import { CharacterController } from "./controller/CharacterController";
import { LocationController } from "./controller/LocationController";
import { getIp, none } from "./middlewares/requestIp";

export const Routes = [
  {
    method: "post",
    route: "/episodes",
    controller: EpisodeController,
    middleware: none,
    action: "create",
  },
  {
    method: "get",
    route: "/episodes",
    controller: EpisodeController,
    middleware: none,
    action: "all",
  },
  {
    method: "post",
    route: "/comments",
    controller: CommentController,
    middleware: getIp,
    action: "create",
  },
  {
    method: "get",
    route: "/comments",
    controller: CommentController,
    middleware: none,
    action: "all",
  },
  {
    method: "post",
    route: "/characters",
    controller: CharacterController,
    middleware: none,
    action: "create",
  },
  {
    method: "get",
    route: "/characters",
    controller: CharacterController,
    middleware: none,
    action: "all",
  },
  {
    method: "get",
    route: "/characters/:id",
    controller: CharacterController,
    middleware: none,
    action: "one",
  },
  {
    method: "post",
    route: "/locations",
    controller: LocationController,
    middleware: none,
    action: "create",
  },
  {
    method: "get",
    route: "/locations",
    controller: LocationController,
    middleware: none,
    action: "all",
  },
];
