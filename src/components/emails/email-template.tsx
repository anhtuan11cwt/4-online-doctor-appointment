import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailTemplateProps = {
  firstName?: string;
  token?: string;
};

export default function EmailTemplate({
  firstName = "Người dùng",
  token = "000000",
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Xác thực email của bạn - Mã: {token}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-12">
            <Section className="rounded-lg bg-white p-8 shadow-md">
              <Heading className="mb-4 text-center font-bold text-2xl text-gray-900">
                Chào {firstName}!
              </Heading>
              <Text className="mb-6 text-center text-gray-600">
                Cảm ơn bạn đã đăng ký tài khoản tại Medical App. Vui lòng sử
                dụng mã xác thực bên dưới để hoàn tất quá trình đăng ký.
              </Text>
              <Section className="mb-6 text-center">
                <Button
                  className="inline-block rounded-lg bg-blue-700 px-8 py-3 font-bold text-lg text-white"
                  href="#"
                >
                  {token}
                </Button>
              </Section>
              <Text className="mb-4 text-center text-gray-500 text-sm">
                Mã xác thực có hiệu lực trong 24 giờ. Nếu bạn không yêu cầu mã
                này, vui lòng bỏ qua email này.
              </Text>
              <Text className="border-gray-200 border-t pt-4 text-center text-gray-400 text-xs">
                © 2024 Medical App. Tất cả quyền được bảo lưu.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
