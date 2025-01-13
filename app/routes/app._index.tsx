// app/routes/app._index.tsx

import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  Box,
  List,
  Link,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export const loader = async () => {
  return null;
};

export const action = async () => {
  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="Welcome Developers - Shopify App Template" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              {/* Introduction Section */}
              <Text as="h2" variant="headingLg">
                Welcome Developers!
              </Text>
              <Text variant="bodyMd" as="p">
                I am Aaron Kaizen, a software developer passionate about creating intuitive and efficient solutions.
              </Text>
              <Text variant="bodyMd" as="p" fontWeight="bold">
                This app template is optimized for Vercel deployment and comes with built-in support for Tailwind CSS.
              </Text>

              {/* About the App */}
              <Box padding="200">
                <Text as="h3" variant="headingMd">
                  🛠️ About This App
                </Text>
                <List type="bullet">
                  <List.Item>
                    <strong>Purpose:</strong> This template simplifies building Shopify apps using the Remix framework.
                  </List.Item>
                  <List.Item>
                    <strong>Features:</strong> Optimized for deployment on Vercel, supports Tailwind, Polaris, and integrated Shopify tools like AppBridge and Webhooks.
                  </List.Item>
                  <List.Item>
                    <strong>Quick Start:</strong> Just install dependencies and start developing locally.
                  </List.Item>
                </List>
              </Box>

              {/* Need Help Section */}
              <Box padding="200">
                <Text as="h3" variant="headingMd">
                  📞 Need Help?
                </Text>
                <Text variant="bodyMd" as="p">
                  If you have questions or need assistance, feel free to reach out via my social media or email:
                </Text>
                <List type="bullet">
                  <List.Item>
                    <strong>Email:</strong> <Link url="mailto:your_email@example.com" removeUnderline>your_email@example.com</Link>
                  </List.Item>
                  <List.Item>
                    <strong>GitHub:</strong> <Link url="https://github.com/yourgithub" target="_blank" removeUnderline>github.com/yourgithub</Link>
                  </List.Item>
                  <List.Item>
                    <strong>LinkedIn:</strong> <Link url="https://linkedin.com/in/yourlinkedin" target="_blank" removeUnderline>linkedin.com/in/yourlinkedin</Link>
                  </List.Item>
                </List>
              </Box>

              {/* Thank You Section */}
              <Box padding="200">
                <Text as="h3" variant="headingMd">
                  🚀 Thank You for Choosing This Template!
                </Text>
                <Text variant="bodyMd" as="p">
                  This template is designed to kickstart your Shopify app development journey with powerful tools and an optimized structure for Vercel and Tailwind.
                </Text>
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
