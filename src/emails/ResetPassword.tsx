import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";
import { Text } from "@react-email/text";
import { Button } from "@react-email/button";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function ResetPassword({
  resetLink,
  name,
}: {
  resetLink: string;
  name: string;
}) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Hello {name},</Text>
          <Text style={paragraph}>
            You are recieving this email because we received a password reset
            request for your account.
          </Text>
          <Button style={button} href={resetLink}>
            Reset Password
          </Button>
          <Text style={paragraph}>
            If you did not request a password reset, no further action is
            required.
          </Text>
          <Text style={footerParagraph}>Best regards,</Text>
          <Text style={footerParagraph}>FlySmartDeals Team</Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const heading = {
  fontSize: "30px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#131415",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#777",
};

const footerParagraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#777",
  margin: "0",
};

const button = {
  padding: "12px 20px",
  fontSize: "18px",
  borderRadius: "6px",
  backgroundColor: "#003366",
  display: "block",
  margin: "0 auto",
  color: "#fff",
};
