import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// Agent Travel
const AgentTravel = React.lazy(() => import("./views/pages/AgentTravel"));
const TambahAgentTravel = React.lazy(() =>
  import("./views/pages/AgentTravel/tambah")
);
const EditAgentTravel = React.lazy(() =>
  import("./views/pages/AgentTravel/edit")
);
const DetailAgentTravel = React.lazy(() =>
  import("./views/pages/AgentTravel/detail")
);
const KontakAgentTravel = React.lazy(() =>
  import("./views/pages/AgentTravel/Kontak")
);
const TambahKontakAgentTravel = React.lazy(() =>
  import("./views/pages/AgentTravel/Kontak/tambah")
);
const EditKontakAgentTravel = React.lazy(() =>
  import("./views/pages/AgentTravel/Kontak/edit")
);

// Paket Wisata
const PaketWisata = React.lazy(() => import("./views/pages/PaketWisata"));
const TambahPaketWisata = React.lazy(() =>
  import("./views/pages/PaketWisata/tambah")
);
const EditPaketWisata = React.lazy(() =>
  import("./views/pages/PaketWisata/edit")
);
const DetailPaketWisata = React.lazy(() =>
  import("./views/pages/PaketWisata/detail")
);
const Include = React.lazy(() => import("./views/pages/PaketWisata/Include"));
const TambahInclude = React.lazy(() =>
  import("./views/pages/PaketWisata/Include/tambah")
);
const EditInclude = React.lazy(() =>
  import("./views/pages/PaketWisata/Include/edit")
);
const Exclude = React.lazy(() => import("./views/pages/PaketWisata/Exclude"));
const TambahExclude = React.lazy(() =>
  import("./views/pages/PaketWisata/Exclude/tambah")
);
const EditExclude = React.lazy(() =>
  import("./views/pages/PaketWisata/Exclude/edit")
);
const Gambar = React.lazy(() => import("./views/pages/PaketWisata/Gambar"));
const Deskripsi = React.lazy(() =>
  import("./views/pages/PaketWisata/Deskripsi")
);
const TambahDeskripsi = React.lazy(() =>
  import("./views/pages/PaketWisata/Deskripsi/tambah")
);
const EditDeskripsi = React.lazy(() =>
  import("./views/pages/PaketWisata/Deskripsi/edit")
);

const routes = [
  // { path: "/ngetrip/dashboard", exact: true, name: "Home" },
  // {
  //   path: "/ngetrip",
  //   name: "Dashboard",
  //   component: Dashboard,
  // },
  {
    path: "/ngetrip/admin",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  { path: "/ngetrip/admin/dashboard", name: "Dashboard", component: Dashboard },

  // Agent Travel
  {
    path: "/ngetrip/admin/agent-travel",
    name: "Agent Travel",
    component: AgentTravel,
    exact: true,
  },
  {
    path: "/ngetrip/admin/agent-travel/tambah",
    name: "Tambah Agent Travel",
    component: TambahAgentTravel,
    exact: true,
  },
  {
    path: "/ngetrip/admin/agent-travel/edit/:id",
    name: "Edit Agent Travel",
    component: EditAgentTravel,
    exact: true,
  },
  {
    path: "/ngetrip/admin/agent-travel/detail/:id",
    name: "Detail Agent Travel",
    component: DetailAgentTravel,
    exact: true,
  },
  {
    path: "/ngetrip/admin/agent-travel/:id/kontak",
    name: "Kontak Agent Travel",
    component: KontakAgentTravel,
    exact: true,
  },
  {
    path: "/ngetrip/admin/agent-travel/:id/kontak/tambah",
    name: "Tambah Kontak",
    component: TambahKontakAgentTravel,
    exact: true,
  },
  {
    path: "/ngetrip/admin/agent-travel/:id_agent_travel/kontak/:id_kontak/edit",
    name: "Edit Kontak",
    component: EditKontakAgentTravel,
    exact: true,
  },

  // Paket Wisata
  {
    path: "/ngetrip/admin/paket-wisata",
    name: "Paket Wisata",
    component: PaketWisata,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/tambah",
    name: "Tambah Paket Wisata",
    component: TambahPaketWisata,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/edit/:id",
    name: "Edit Paket Wisata",
    component: EditPaketWisata,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/detail/:id",
    name: "Detail Paket Wisata",
    component: DetailPaketWisata,
    exact: true,
  },

  // Include
  {
    path: "/ngetrip/admin/paket-wisata/:id/include",
    name: "Include",
    component: Include,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/:id/include/tambah",
    name: "Tambah Include",
    component: TambahInclude,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/:id/include/edit/:id_include",
    name: "Edit Include",
    component: EditInclude,
    exact: true,
  },

  // Exclude
  {
    path: "/ngetrip/admin/paket-wisata/:id/exclude",
    name: "Exclude",
    component: Exclude,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/:id/exclude/tambah",
    name: "Tambah Exclude",
    component: TambahExclude,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/:id/exclude/edit/:id_exclude",
    name: "Edit Exclude",
    component: EditExclude,
    exact: true,
  },

  // Gambar
  {
    path: "/ngetrip/admin/paket-wisata/:id/gambar",
    name: "Gambar",
    component: Gambar,
    exact: true,
  },

  // Deskripsi
  {
    path: "/ngetrip/admin/paket-wisata/:id/deskripsi",
    name: "Deskripsi",
    component: Deskripsi,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/:id/deskripsi/tambah",
    name: "Tambah Deskripsi",
    component: TambahDeskripsi,
    exact: true,
  },
  {
    path: "/ngetrip/admin/paket-wisata/:id/deskripsi/edit/:id_deskripsi",
    name: "Edit Deskripsi",
    component: EditDeskripsi,
    exact: true,
  },
];

export default routes;
