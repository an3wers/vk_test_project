import { FactGenerator } from "../../../features/fact-generator";
import { UserForm } from "../../../features/user-form";

export const HomePage = () => {
  return (
    <main className='container'>
      <FactGenerator />
      <UserForm />
    </main>
  );
};
