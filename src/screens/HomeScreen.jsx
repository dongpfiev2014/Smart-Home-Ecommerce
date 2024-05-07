import React from "react";
import { Helmet } from "react-helmet";
import VideoLandingPage from "../components/LandingPage/VideoLandingPage";
import { Layout, Space, Row, Col, Image, Flex, Button, Carousel } from "antd";
import MediaLandingPage from "../components/LandingPage/MediaLandingPage";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const images = [
    {
      title: "Vimar’s Eikon Exé presents the new Tondo control",
      imageUrl:
        "https://www.vimar.com/cache/images/content-card-full/w1440h0q75/eikon-exe-con-comando-tondo-3-moduli-hnojfmbjyq.webp",
    },
    {
      title: "Linea. The design of a perfect Line ",
      imageUrl:
        "https://www.vimar.com/cache/images/content-card-full/w1440h0q75/serie-linea-illuminazione-dal-basso.webp",
    },
    {
      title: "Smart Home - connected wiring series",
      imageUrl:
        "https://www.vimar.com/cache/images/content-carousel-tns/w1920h600q75/smaart-home-1920x600-hjw805n70y-hk9s4hkll1.webp",
    },
    {
      title: "Vimar wins the international Good Design 2023 award",
      imageUrl:
        "https://www.vimar.com/cache/images/content-card-full/w1440h0q75/banner-linea-xt-sostenibilita-en-hmt54nj2fv.webp",
    },
  ];

  const partnerImages = [
    "https://vtdsmarthome.com.vn/wp-content/uploads/VIMAR-1.webp",
    "https://vtdsmarthome.com.vn/wp-content/uploads/ELVOX-1.webp",
    "https://vtdsmarthome.com.vn/wp-content/uploads/VDA-1.webp",
    "https://vtdsmarthome.com.vn/wp-content/uploads/SAMSUNG-1.webp",
    "https://vtdsmarthome.com.vn/wp-content/uploads/SOMFY-1.webp",
    "https://images.squarespace-cdn.com/content/v1/58270e1c6a49634bd84860d8/1620737422118-MGRHEVNFCW6PENR4UPS1/Ekinex-Logo-200-by-60.png",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgoAAABcCAMAAAA4V22kAAAAmVBMVEX///9HmrsdHRuu0+GAudCXxtlSoL/F3+qMwNTo8vZdpsPR5u7z+fujzN1/f37U1NS62eVprcjc7PI4ODdHR0Wgy9zs9fjB3eiOjo3t7e10s8za6/FYpMF4tc2t0uH4+Pjj4+JdXVtpaWi4uLdPT02hoaApKScwMC94eHe6urnExMPm5uZAQD7Nzc2YmJdxcXBjY2KsrKuSkpExQDCBAAAMHklEQVR4nO2daUPbvBKFs5MNmgWSQANOWEIXeFv6/3/cxXYWy3NmNEptRbn1+UaQLXn0WCONZKlWq1SpUqVKlSpVqlSpUqVANexNJr3ZqUsRgmJLTLSWSM02LLVAPjUbtZb1VP3RqQtzSk2a3XFna4nlXXsuVnEvk7gz7jYnHop3hEyoB/l/G/X9tVXPqG3LO2OeIcpaxZLlxqTAnxLvNwMX9EgqOc3ssl/P624UMQ9wQxP3L0tuVUckS4UGxi3a+X+PD/+bdc1/GSg0wa2z1qPmyCXg1KWXLaUCf0q83wBccEFSdYQ0PVCkpFgPAIbBPU5c75YKQ7koXCxz/3JC4RLlfal4KFop9RupwPWSURiiHLfqD3K3mdzxiTsPiqc/VqWicEOudEKhh/Ie16y6AJdlXa1vFAb5F8LUjXEXajNDLcalFKAyUQCNohMKNfh+2PtPIF8DIM8owMYtq9bhHrOxLfG4tPFEiSgg9+iGAiyc3UMA/2B0C/2iwPQSstqzMJHbj0R31uc/UuWhAFs6NxSGoFLtHgL5B+NV8opCC1xLtDXLBD0vUddmgCNVGgpz6ZlTWVHAb5TNQ4CLWkYCnyioSKjX5/ENeoo2AWddiMpCoYcBd0QBveC5bhYVyNk0nkcUhKGDoeXnMHFo7Sds1S+n61gWCszQ2BGFGnpP+vITAXw6Zgp/KOCmEamLi4WlGVC7qyQUOBu4ogDN81V8Itu4xSMKTZXvTzVBmTDqlNIslIQCDBTW3VGYoJvIHgKYP8eONxRc1NK6h1ilTOWUgwJ7V1cUashAoocA1ZZPHyQKTiplQFkOCizhziigNKKHAP4h71rPHwXVTIyr5n1T6Hn6eZlVQVGAzXoiZxSG1rvkBB4gf89ToNC/uZjMhr1Bk5tqyqrTnn8mnk1GXe6e8kxqMQIvVcdyCUWBD7U6owAH5oKHALVGWlP/KIwzqXu2UEMnU89DZkqiRXIvXoWgwJPvjgIMLeRn84TCgD6WdxRyrdgDmzDWvTnJMIC3tdVJESoChZyX6bfa7Xa3NV7mjaJCAVqY9xA0ENEh8ze+USBhAGmCirzveJBZRmchpyJQyKp/eSh0b9Q6AgV0+yVJtRWwGw3Ze0YBzBnwA8cxDRlA+5YUfM6qWBTkpRY6FL6iG3MeApSFJvWLAqhc7PUSg4G3fYZuXE7A0VChKPTlmSMdCjBcxc3OUf8AGhC/KEBquRAcrGE0KVfW9KSc7dEo9C1L8ZQoIM/KlAnUGehWeEUB9/UZmy1hRBlF8e/FAheiAlHo2GaTlSjM0M2xrwRFAYXwigJ2ZYyHwM0+iq0o1vX9rQpEwRoGUaIAZzlxA0nbXWQynygwIRC4bLNeZ5pRcGe241ycikPBzq0WBRQch4UCPUzEo08UuKkzaDKu1UdrPMUCF6LiULAPd7QowHVt6PagJOg984kCN10C+41cO4r6jWKBC1FhKCicmRYFdRea2hd22jyiwNoORha4zhUqcPkfUhaGguLjDTUKqCrA8g3gH+baAosFPR4FtqOP2nzW0Ggi4oxQUHzTpUYBNqe0lqnFcNE9osCuskFdYZYbNJw+HxQ0gx09Cui1oG0/BQaPMzyiAFulWGh6kp1ZOW8UbMuSY+lRQGMv4iGAf8CDeo8osKEVhAI7+j5vFPhp5IP0KEDXmn/jaNPBDOo9osBWGEKBtdl5o6ApqQMKKGneQ1D/wMzZ+EOBNx1CgW1CzhoFy7cKqRxQQLHX3EIEsIqOuZk/FHgzIBTYnvZZo6CaLXFAAZrOXJ5E/QO3LtgfCnznGT0Pm/jvULj9ubo95sOJglBQzaG6oIDmb0wPQf0D97WAPxT4NwKgwNv5aBRWL4/Xm0as6Xrx7shDQSiodgdxQQF+Mpc1B/UPdCWbUGCxoEejwK9G9YBC9HLdMPR69cV6UUYFoaD6fMcJBVsu1D+wLVOgKPAdi2NQiBabBtWjAwwFoaBaeueEAvq2Itv+Uv/AlsEZBeSdVCjwfrJsFJ6mAIRYC7WbKAgFTVjBDQU4gXOwByWFn9F3RgEtIwoahejbvuqn62+LxdXjwVdcr8RnPaggFFQbTrqhgL4eOMTnqLX4BfLOKKAFEyGjcPu8rfbnl9Xut+j749ZjbH6ID7tXQSiolum7oYDWtR08BG0zeBqdUUAUBozCz7e0ztfv5u+3V1sYnsSn3akgFFR7TbqhACfzdvlQ/yDMhzmjoOsNhYLCbeoMpt/pv1brlAVVu1AQCqpRryMKyGPvPAQ1ljCcdS4wigeFi0Ja3etb+M//Uh+x4h92r4JQUOTkjEIEbL0LKFL/ILRLziigHmuwKCySyv7FDRSe0r6jYhwRMApwXVta43QSW/rU2NmjgfTBovAljR/s/5xutdj9krKwwFdnFTIKKNKT+gFqK3bNCFNgacgDP9ULFYVk8PC8f+m/7MaQV/sUqY9YCQ+cKmQU0Lq21EOQFlzcuAoVWNrIBe78EigKT7muAEAh7Uw80mtzChoFZJL4AuofxOkwtDxOCo/CvTECRSEZPbwc/kYorDaqZiFoFNC6tnh5CjWVGO1ElhUmTVB3NVQU3uNKfsv8gFBIe5ZX+WvzChoFtK4tjh8Q/yCvnEGWFbZ3wntQholCEnD+yPwAUbiNm4VX2yDiiA9xPKKAIsA90FjIuw+gfIW1NnjvpDBReI17Ctk6hijUHjVxJoSCJV7kEQX0ydwliAvLd0GvOd/0MV+6BonCKgkpZH/BKHzXjCcRCpa5JY8o4FM/iNuw7HAJdzdihxDMeQ5BovCR9w8MClESj2TzS4XqVRqjM5dYckl1BApwEQn5xbJwBr7n3Icb3B6UQaJwRYYGGIVkoDFl80uF6lXaMZO5xJJLqiNQQOvaaBXYZkDQkIBb3sAd6hUkCkkfwPiFQeFX/JOl34jmYy0r2b2iYDllK5F1f0v4GTNuStj8gkThmbzsDApJ84EnrPaCIyd5TZJXFPg9gw+yrqaD7n+JjMsf6BAkCnG7f238wqDwRxFkgvF2uRvmFQVhy8Od7HvT4D3OQWMiHO0RJArPuQATi8JCgUIEn1scp/tFAU4IGLJ0bWrs+JBUnOSNgkRhXaSDYN46o389M43tFwW4FbwhxbpKpmkZG5deiA1QkCg8kt4ggwJNCMRtsjVK8x5+fbjL1bRfFKxntGl2dmA3Wb6fpwsXhgNwmrihIFFI2n3jUwcGhTfiSYD4I4z643F/O5YzePKMArsp7laaD7MYD5Fo+fmcilP+gkQhCTG9ZH/BKNzGv/y2GAl/kSaWwzMKtgKqVtgqj38UFCQKP0kVYxQSZP6z2Eh3xl3PdoE1l1hHoiAXULfjrcPxbYyCRCFp+I3uIEZhTRwJlNR47nRSFOB4dy/lYWtcEBELdCDDRGGRf90hCsmslbWrUFOdp230tH2jIIYWtEcwyjzl1AKNSJgoJJWcXYkAUUhWNSgWuuLzB0wZ4UfvKEgH7qg3x9ef9Vq/j84GhbTpz1Q7QiH5bfPTaqKa5sDB06IAt4JHJZMUqY/4vI9Q1yJQFJIVbY3DF3IAhShZ//hNYSNcTsEO3lHgDrwWzUk0UZ4L2YpgLzNQFGq/43qe7nuOAIXEPWxsocatIlunyljB4B8FfmpAs13kTrpRxA2TNFQU0uXM+w8hVtdb7fuSyUyUGXyQNLSwYHTT/aOA1yCrL98Jn9tnqJPW+BmhkMYMGs/cW59+R2dbwZRRJPsIY99R/yiwgxzHs5onluByvbWNV50TCqkDaLzBsEGUrFnJOBCNmtIrc2oUuLbd9XzeoThw7u+r+6xQiNJPqTd/6Lj6R7rzwuuKvRhqJpjJmLQ+AQrciWzu+1oOWFc4znjBs0Jhx0Lj7cOE4X37+6vTRm2Jem0m3N8x+gqjFpXq/hfgQtUMAs6z1Trq8MUBOgO80zVGpROaF10h3aWJ+KmxS5qY52YOnlWifusGPluGb9+3riB6/7Pdi6XxthLtwWnQzr01nXH3QfrU9Bw1nLezQYbOXfvimN1PQ9JLY6/p8/r3+u3w96NTP8FUbzAaNZvN0Wg+mJS/s/Cp1LuIn/JhPvBw2rMHfVk3oF4/7NdW+j/T0zUAAXQlK/0D+vHL3ND1+aMC4Z/VZ2fx1/V0s3l9+3319Bd9hEqVKlWq9C/qf7Z1t4kb5f8xAAAAAElFTkSuQmCC",
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Revox_logo.svg",
    "data:image/png;base64,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",
    "https://www.ilevia.com/wordpress/wp-content/uploads/ilevia-2.png",
    "https://cdn.cookielaw.org/logos/e16fc3d8-3059-4c21-a04c-6ac0867610fc/535e8075-8ed1-4028-8d63-88102002b575/f40c1044-3f61-4257-ae90-ae4e4bb06333/STL-LOGO_4c_pos.jpg",
    "https://thietbihager.com/wp-content/uploads/2022/09/hager-worldwide-logo-vector.png",
  ];
  return (
    <>
      <Layout style={{ backgroundColor: mode ? "#001529" : "white" }}>
        <Space direction="vertical" size="large">
          <VideoLandingPage />
          <MediaLandingPage
            src={`https://www.vimar.com/cache/images/content-card-full/w1440h0q75/archiproducts-1920x600jpg-hkc0qeot9a.webp`}
          />
          <MediaLandingPage
            src={`https://www.vimar.com/cache/images/content-card-full/w1440h0q75/banner-linea-en-v2-1920x600-hn9dwg6i48.webp`}
          />
          <Row gutter={[16, 16]} style={{ padding: "15px" }}>
            <Col span={12}>
              <div
                style={{
                  backgroundImage: `url(https://www.vimar.com/cache/images/content-card-side/w960h0q75o58ec93ca/07-1920-hfe8flm82x.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Flex
                  vertical
                  gap="middle"
                  align="center"
                  justify="center"
                  style={{
                    marginTop: "30px",
                    fontFamily: '"Roboto Flex", sans-serif',
                    color: "white",
                  }}
                >
                  <Space>
                    <Button
                      shape="round"
                      size="large"
                      type="primary"
                      style={{ fontFamily: '"Roboto Flex", sans-serif' }}
                    >
                      Learn More
                    </Button>
                    <Button
                      shape="round"
                      size="large"
                      className="custom-button"
                      style={{
                        fontFamily: '"Roboto Flex", sans-serif',
                      }}
                    >
                      Buy now
                    </Button>
                  </Space>
                  <h1>Linea, unique line</h1>
                </Flex>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  backgroundImage: `url(https://www.vimar.com/cache/images/content-card-side/w960h0q75o58ec93ca/focus-tondo-hno90d06ph.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Flex
                  vertical
                  gap="middle"
                  align="center"
                  justify="center"
                  style={{
                    marginTop: "30px",
                    fontFamily: '"Roboto Flex", sans-serif',
                    color: "black",
                  }}
                >
                  <Space>
                    <Button
                      shape="round"
                      size="large"
                      type="primary"
                      style={{ fontFamily: '"Roboto Flex", sans-serif' }}
                    >
                      Learn More
                    </Button>
                    <Button
                      shape="round"
                      size="large"
                      className="custom-button"
                      style={{
                        fontFamily: '"Roboto Flex", sans-serif',
                        color: "black",
                        border: "1px solid black",
                      }}
                    >
                      Buy now
                    </Button>
                  </Space>
                  <h1>Tondo controls</h1>
                </Flex>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  backgroundImage: `url(https://www.vimar.com/cache/images/content-card-side/w960h0q75o58ec93ca/serie-linea-vimar-design.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Flex
                  vertical
                  gap="middle"
                  align="center"
                  justify="center"
                  style={{
                    marginTop: "30px",
                    fontFamily: '"Roboto Flex", sans-serif',
                    color: "black",
                  }}
                >
                  <Space>
                    <Button
                      shape="round"
                      size="large"
                      type="primary"
                      style={{ fontFamily: '"Roboto Flex", sans-serif' }}
                    >
                      Learn More
                    </Button>
                    <Button
                      shape="round"
                      size="large"
                      className="custom-button"
                      style={{
                        fontFamily: '"Roboto Flex", sans-serif',
                        color: "black",
                        border: "1px solid black",
                      }}
                    >
                      Buy now
                    </Button>
                  </Space>
                </Flex>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  backgroundImage: `url(https://www.vimar.com/cache/images/content-card-full/w1440h0q75/banner-linea-e-linea-xt-header-800-hfe7xhepo2.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Flex
                  vertical
                  gap="middle"
                  align="center"
                  justify="center"
                  style={{
                    marginTop: "30px",
                    fontFamily: '"Roboto Flex", sans-serif',
                    color: "white",
                  }}
                >
                  <Space>
                    <Button
                      shape="round"
                      size="large"
                      type="primary"
                      style={{ fontFamily: '"Roboto Flex", sans-serif' }}
                    >
                      Learn More
                    </Button>
                    <Button
                      shape="round"
                      size="large"
                      className="custom-button"
                      style={{
                        fontFamily: '"Roboto Flex", sans-serif',
                      }}
                    >
                      Buy now
                    </Button>
                  </Space>
                  <h1>Dynamic</h1>
                </Flex>
              </div>
            </Col>
          </Row>
          <div style={{ padding: "15px", cursor: "pointer" }}>
            <Carousel
              arrows
              dotPosition="left"
              infinite={true}
              autoplay
              autoplaySpeed={2000}
            >
              {images.map((item, index) => (
                <div key={index} className="carousel-item">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="carousel-image"
                  />
                  <h1
                    className="carousel-title"
                    style={{ fontFamily: '"Roboto Flex", sans-serif' }}
                  >
                    {item.title}
                  </h1>
                </div>
              ))}
            </Carousel>
          </div>
          <div
            style={{
              overflow: "hidden",
              width: "100%",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontFamily: '"Roboto Flex", sans-serif',
              }}
            >
              Our Partners
            </h1>
            <Flex
              justify="center"
              align="center"
              className="image-carousel"
              gap={30}
            >
              {partnerImages.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  preview={false}
                  width="150px"
                  height="auto"
                />
              ))}
            </Flex>
          </div>
        </Space>
      </Layout>
      <Helmet>
        <title>Smart Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    </>
  );
};

export default HomeScreen;
