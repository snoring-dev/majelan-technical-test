import { getUsers } from "@/actions/get-users";
import Container from "@/components/container";
import ListOfUsers from "@/components/list-of-users";

const App = async () => {
  const users = await getUsers();
  return (
    <div data-testid="appContainer">
      <Container>
        <ListOfUsers data={users} />
      </Container>
    </div>
  );
}

export default App;
