import { Routes } from "@angular/router";

export const PUBLIC_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "services",
    loadComponent: () =>
      import("./services/services.component").then((m) => m.ServicesComponent),
  },
  {
    path: "projects",
    loadComponent: () =>
      import("./projects/projects.component").then((m) => m.ProjectsComponent),
  },
  {
    path: "categories",
    loadComponent: () =>
      import("./categories/category-list/category-list.component").then(
        (m) => m.CategoryListComponent
      ),
  },
  {
    path: "categories/:id",
    loadComponent: () =>
      import("./categories/category-details/category-details.component").then(
        (m) => m.CategoryDetailsComponent
      ),
  },
];
