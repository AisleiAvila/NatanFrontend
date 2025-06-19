import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: "services",
    loadComponent: () =>
      import("./services/service-list/service-list.component").then(
        (m) => m.ServiceListComponent
      ),
  },
  {
    path: "services/new",
    loadComponent: () =>
      import("./services/service-form/service-form.component").then(
        (m) => m.ServiceFormComponent
      ),
  },
  {
    path: "services/:id",
    loadComponent: () =>
      import("./services/service-form/service-form.component").then(
        (m) => m.ServiceFormComponent
      ),
  },
  {
    path: "categories",
    loadComponent: () =>
      import("./categories/category-list/category-list.component").then(
        (m) => m.CategoryListComponent
      ),
  },
  {
    path: "categories/new",
    loadComponent: () =>
      import("./categories/category-form/category-form.component").then(
        (m) => m.CategoryFormComponent
      ),
  },
  {
    path: "categories/:id",
    loadComponent: () =>
      import("./categories/category-form/category-form.component").then(
        (m) => m.CategoryFormComponent
      ),
  },
  {
    path: "regions",
    loadComponent: () =>
      import("./regions/region-list/region-list.component").then(
        (m) => m.RegionListComponent
      ),
  },
  {
    path: "regions/new",
    loadComponent: () =>
      import("./regions/region-form/region-form.component").then(
        (m) => m.RegionFormComponent
      ),
  },
  {
    path: "regions/:id",
    loadComponent: () =>
      import("./regions/region-form/region-form.component").then(
        (m) => m.RegionFormComponent
      ),
  },
];
