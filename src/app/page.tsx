import Container from "@/components/container";
import { Heading } from "@/components/heading";

const App = () => (
  <div data-testid="appContainer">
    <Container>
      <Heading title="Users" description="A list of all users" />
    </Container>
  </div>
);

export default App;
