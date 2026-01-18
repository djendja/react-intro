import { useState, useEffect, useMemo } from "react";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── novo ──
  const [searchTerm, setSearchTerm] = useState(""); // za pretragu
  const [sortConfig, setSortConfig] = useState({
    // za sortiranje
    key: null, // 'firstName', 'age', 'email'...
    direction: "asc", // 'asc' ili 'desc'
  });

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Greška prilikom učitavanja podataka");
        setLoading(false);
      });
  }, []);

  // ── Novo ── filtriranje + sortiranje (najbolje u useMemo)
  const displayedUsers = useMemo(() => {
    let result = [...users];

    // 1. Pretraga
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.phone.toLowerCase().includes(term)
      );
    }

    // 2. Sortiranje
    if (sortConfig.key) {
      result.sort((a, b) => {
        // vrednosti za poređenje
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // specijalno za stringove (ime, email...)
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, searchTerm, sortConfig]);
  // ──────────

  const handleSort = (key) => {
    setSortConfig((prev) => {
      // ako kliknemo na isti stubac → menjamo smer
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      // novi stubac → počinjemo sa asc
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  if (loading)
    return <div>Učitavanje korisnika...</div>;
  if (error)
    return <div>{error}</div>;

  return (
    <div>
      <h1>Lista korisnika</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pretraži po imenu, email-u ili telefonu..."
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Slika</th>

            <th
              onClick={() => handleSort("firstName")}
            >
              Ime i prezime {getSortIcon("firstName")}
            </th>

            <th
              onClick={() => handleSort("age")}
            >
              Godine {getSortIcon("age")}
            </th>

            <th
              onClick={() => handleSort("email")}
            >
              Email {getSortIcon("email")}
            </th>

            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.length === 0 ? (
            <tr>
              <td colSpan={5}>
                Nema rezultata za traženi pojam
              </td>
            </tr>
          ) : (
            displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
