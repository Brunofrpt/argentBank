import InputForm from "../components/sign-in/InputForm";

function SignIn() {
  return (
    <main className=" main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <InputForm />
      </section>
    </main>
  )
}

export default SignIn
