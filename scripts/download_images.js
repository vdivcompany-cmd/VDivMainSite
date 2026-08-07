const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const targets = [
  {
    name: 'why-trimax.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeYrSz6V8O71B5wSXvc2DlY7X_NnjOi4IWDk77LRtbSFVkAjXwPMI05y4jFboL2RnCxWYU1pu9AzBq7OXTpVa3JxCjYqRURv2DNMoZv6Ixm938FdAO0VYJPZgK_5asO8u4uOOfP31HfLoBxfU9weQbNhtknl6VBIvmZnUZFnex-NDeRmp-wKjaVWAq6HI30QwLPEkN9fWuj44J_jz2m83ndQ6AMVcQfKoUl2St_iB_Jlfh1uJISIZRSw',
    width: 800
  },
  {
    name: 'project-featured-1.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGzv6D115ocp1g8DMHhbstUUEWsRp6UR7jrUay6DPo0Q8wV_56w01eCfBbZjOYPVRbC1W6Cp8uqVKF_ryHpiKIXmU7PPoDR6Z27ZyG5xjXPi9b1YWhs0bFMdZtdw-aKMibBrxUc6P0UfzZf8wODIB6W9gkU_r3b3rmudQQ_tWq0x8U8ALlp3S2tqBoNoNyfZ6mQ2qKaQitP7AJSHTPVQcxZDSymL3dCZ6G-2ZGFIPcTlXZM7tygrfDiw',
    width: 800
  },
  {
    name: 'project-featured-2.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Xvml8SRymplFVlN4tkizCtVVN_hDlInKP2uHobs3dROWRXdXZoZPldvYLP5R4CxynPhaEaLsXZuDLoNKRm37QwNtArn878LrN3Dz5UUzo4LJeoRlPrUUswm0LCgl-XQNf2Q9YNKo_BqOlZg1uPudZQZsN7qatqABJ9NuvQ1EpPYndVo0PtWMH1gQnWGlYUUGZ2EqvdsvoWyBgzcdYgWgNqySoPDm3zTUeP3-fiY-4lQDbeDZboGvuw',
    width: 800
  },
  {
    name: 'team-banner.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkor53hFNxATGaK4DfsGxZujzJbMvbGFEToY6OuiLh8USLdAIpI7QaXOqDQfHxkwmHACAwE1YcO_GELgXGhEKFAo7Fujlegz60bihgFIOxlWkIw8LVjeYTQMMkmIm5eTwT1nk0-5BORE5pfeAyUrEAgowAv1C0lVft2fGffhqp6xrsHYGxzB4dImTS9SAI5DNVmaxeLlzUs0gf7qaOnNRFNJZcMGO3sl-WbScKIuUVVti-K30BL9l1Hg',
    width: 1000
  },
  {
    name: 'avatar-elena.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl0MGjX91AJx9M4qRk5lGOtPZvGSusQEsnPd69ymyV_5_w_nuJdVJaN4xb3At4Ko5NHfXmrvPDw5PnDyZw3NL2BWUeYSm5qbQOM4-kKyXMGGMT7M1mAEAIDBGpEie8Dq7PVNcEe0aJspNqSRs4ADFeIk3t1Pm8XshV55VY2m1brlsqW5JIfBvYg-orLlsUJ-6DIwrdQg9JICHG6LrE24zrSKeD-B0rDgE0TeTBldQzieWv2YCgHR8K0Q',
    width: 160
  },
  {
    name: 'avatar-marcus.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYy7MKQ7jPGYW_9Ou888rfyphCpPze3yw0bYNHacq1AH7xRdOT7hg8cMZf85EAMuhWVdESwXSWAxBLFrlZdktRaPh8asiOte-CfW06LMBpolc8TdO8eqeqlu5NuebbOp5vD8wt1t-WEqqcO6d3aVP984UXfhMV1adNQ3YNot9rYT-9GNRxx615t7ew0CewrJRs8TQRrx629caniyO7TaXBKCqi3NwjDojvpjZ3kitRD3wt_3zHuVeCjQ',
    width: 160
  },
  {
    name: 'avatar-sana.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnsjwq3nAs7vz-yOmNxhfnKgbGmtkmHFH6Z0z1aJivVLvdVjCfiKJcXrZoSN6OW3YI5RCIXBXj87v05Pnl6q3w9xLnnsFEODK1XQktDF5OBTqqJZ6fy5wHizyTWcOAe3YgGWsp_vQefQSaHWXrPFu0Bf-Y6IBgEyWIrqRzDab6oVZsK04xQ4DRSrcYh-NquRRpBu5nwqesLe5ZhR3QolMsMY9QUEp11JJeIlw8phupUeUZsyNKHCXCRA',
    width: 160
  },
  {
    name: 'avatar-julian.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALMGtte3XNI1px4vieWSSLcLe3FVkbiipNthdRKF0W7enM6Sn-4BHXZTnP3ZvLb0hIFBXyGud2TcJRpseENkUBgBnhWp_I5V7y1lhdjXYzTPWMc-E8Vv52lBM62zXrZws1noKqH2geF11q4dCK9MS_0E3Opwr-soDJ_xWR2BnU5gcBJ7XRUGzWS2THhBWnTE1e8m27yTuzOQEMOU7QnoJb4r7iO9S9ZVIeim-EX9wuI3aVqjQOmGi9Tg',
    width: 160
  },
  {
    name: 'obsidian-standard.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoG2xlp7aiWPWVBs7xMD0XrC3GpEsc8RppKC3taMvhAVbIrrRpxZG_o0QkNKS3-Y65TGSbnd-eV20g7ohq7kCjILqfD3UdFQq6dCvYUmJn022CSVMJalNdYfHPAEp2QjEx7QBhjTyiNE0Eql2T85Uz6ssB-9gC3y1pBIx20amD3Weh5T56wpGeC6xiUkeMBvQEFrNK5RGtr17A8-5bUFfdzSm1K-8ov7--ID6GnH1XETX-jKhPZv3-NA',
    width: 800
  },
  {
    name: 'project-obsidian-core.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb5huA945QI1jM1-ae-XRVRFWfSNxMLIUwvyFSTXrhYvGM9x00mzQz2FFAIKU5pK88fIuiUivUmBRdsPdBv3kZkvjAMWVTclUDXvleCqCICJo2sjri8k4kN0S8KsLZr9zUKU6VQ5FyAyrHY6zRQpygcilg5CkW1norV0DKQ8YBsxZMqbO1Vs6Zq1Q9li2B3LFeL6Gy1yusFD6pTpATHD0qXSzDxCUNhmBB5gjvLudG9H-7Zy92L7lrKQ',
    width: 800
  },
  {
    name: 'project-luxe-ledger.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-zD2T3WvQTrQNnKd1A9aJRAUBq6scRZzII1E2a5TCqKsVaAF_azDkJPIsZpc1asrXbraM3ayx_pzDEQVkVFFXCGUAPQjOiiUyGbHNl0zfmrwHErT17tsRqYUcXCVGyyB_I1-XfpGfuyGJVQsG8SuNHgcHMG4T-71raxljVvzCf56uSxpzCW_N-1sG5vqUtwRA_Hi52eTm1vaUFXjIpemgDkGrd3NhirWK6akf9LdmqqyHP-b8edRZZQ',
    width: 800
  },
  {
    name: 'project-aerosync-hud.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8DV3nuHn2OiAKgFouE01-mMTH4kp6kXypLT5brtkXmnSdRzbY1GF59Ff5SuZZKb7LaWwS4JES6lYYIXOBpT2Sb04JpF9WzGEJw5jiCas79qoILWSSnMHEndw460yiWLISjM9GcevWpkGxZbKjBzMLRZ_tDQMu4f2lGd2Kz97pXThaePOrXdIswk_dDs_t8i4smyMF9E78dZUsJuXDiDk6RB_zfcYk99JvfbKhvK1dkPY_p0LZ3k1h8g',
    width: 800
  },
  {
    name: 'project-synapse-grid.webp',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcc4MpPDERpgGo22FKoF2kw-g423sCChgWN7_DSIQLRC1WsqsjoHLoWl9PIiWP79TsdAm4Vot-pSmSfL4JZdr42yUMlYQ2_-HU7np9fyrWkxnZZK6b5_bdkBVGzzc9umkxKwM7T-Yw15Lz7eqc453Ce48j1dh5EU09XeZ7RIZvxFvR-g4HKqM1zRLGA4dpomKRykKOdspPgVipt5oCVc7vYFKaL7Ct_K-aCPQCtc_PVeHP8o0W8Tmbeg',
    width: 800
  }
];

function download(target) {
  return new Promise((resolve, reject) => {
    const tempFile = path.join(IMAGES_DIR, `temp-${target.name}`);
    const file = fs.createWriteStream(tempFile);
    https.get(target.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${target.name}: HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        
        // Use sharp to resize and save as webp
        sharp(tempFile)
          .resize(target.width)
          .webp({ quality: 80 })
          .toFile(path.join(IMAGES_DIR, target.name))
          .then(() => {
            fs.unlinkSync(tempFile); // clean up temp
            console.log(`Success: ${target.name}`);
            resolve();
          })
          .catch((err) => {
            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
            reject(err);
          });
      });
    }).on('error', (err) => {
      fs.unlinkSync(tempFile);
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting downloads...');
  for (const t of targets) {
    try {
      await download(t);
    } catch (err) {
      console.error(`Error on ${t.name}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

run();
