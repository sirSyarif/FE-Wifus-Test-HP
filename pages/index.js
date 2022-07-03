import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CCard,
  CCardBody,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CButton,
} from "@coreui/react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

// service
import UserService from "services/UserService";

// components
import { Toaster } from "components";

export default function Home() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      router.push("/");
    }
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .test("validator", "Password tidak memenuhi syarat!", (value) =>
        [/[A-Z]/, /[a-z]/, /[0-9]/, /[$-/:-?{-~!"^_@#%&*_.,`[\]]/].every(
          (pattern) => pattern.test(value)
        )
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      UserService.login(values).then((res) => {
        setIsShowToast(true);
        localStorage.setItem("email_hp", res.data.data.email);
      });
    },
  });

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <div className="container">
      <Toaster onOpen={isShowToast} />
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <CCard className="col-lg-5 col-sm-12 mx-auto">
          <CCardBody>
            <center>
              <h2 className="mx-auto" style={{ fontWeight: "800" }}>
                LOGIN
              </h2>
            </center>
            <FormikProvider value={formik}>
              <Form onSubmit={formik.handleSubmit}>
                <CFormLabel>Email</CFormLabel>
                <CInputGroup>
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="user@mail.com"
                    type="email"
                    name="email"
                    invalid={Boolean(
                      formik.touched.email && formik.errors.email
                    )}
                    feedbackInvalid={formik.errors.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </CInputGroup>
                <CFormLabel>Password</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="******"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <CInputGroupText onClick={handleShowPassword}>
                    {isShowPassword ? (
                      <BsFillEyeFill />
                    ) : (
                      <BsFillEyeSlashFill />
                    )}
                  </CInputGroupText>
                </CInputGroup>
                {formik.touched.password && formik.errors.password && (
                  <CFormFeedback
                    style={{
                      color: "#dc3545",
                      fontSize: ".875em",
                      marginTop: ".25rem",
                    }}
                  >
                    Password tidak memenuhi syarat !
                  </CFormFeedback>
                )}
                <center className="d-grid gap-2">
                  <CButton
                    type="submit"
                    style={{
                      background: "#6c0404",
                      color: "white",
                      marginTop: "15px",
                    }}
                  >
                    Login
                  </CButton>
                </center>
              </Form>
            </FormikProvider>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}
