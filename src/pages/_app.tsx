import { Container, Flex, MantineProvider } from "@mantine/core";
import React from "react";
import { AppProps } from "next/app";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../styles/globals.scss";
import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

type NextPageComponent<P = {}> = React.FC<P> & {
  getInitialProps?: (ctx: any) => Promise<any>;
};

type PageProps = Record<string, any>; // Define your specific types for pageProps if needed

type MyAppProps = AppProps & {
  Component: NextPageComponent<PageProps>;
  pageProps: PageProps;
};

const inter = Inter({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();
  const pagesWithoutSidebar = ["/basket", "/product/[productId]"];

  const hideSidebar = pagesWithoutSidebar.includes(router.pathname);

  return (
    <main className={inter.className}>
      <Provider store={store}>
        <MantineProvider>
          <Notifications position={"top-center"} limit={3} />
          <Container size="xl" style={{ minHeight: "100vh" }}>
            <Header />
            <Flex justify={"space-between"} direction={"row"}>
              {!hideSidebar && <Sidebar isDrawer={false} />}
              <Container
                fluid
                style={{ width: "100%", paddingTop: 16, paddingBottom: 16 }}
                className={"px-0 md:px-4"}
              >
                <Component {...pageProps} />
              </Container>
            </Flex>
          </Container>
        </MantineProvider>
      </Provider>
    </main>
  );
}

export default MyApp;
