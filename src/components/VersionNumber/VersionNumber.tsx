import { useEffect, useState } from 'react';

interface Props {
  metricsUrl: string;
}

const VersionNumber = ({ metricsUrl }: Props) => {
  const [versionNumber, setVersionNumber] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (versionNumber) {
      return;
    }
    setStatusMessage('Loading...');
    fetch(metricsUrl, { headers: { Accept: 'application/json' } })
      .then(response => response.json())
      .then((data: { versions: { cms: string } }) => {
        const {
          versions: { cms: cmsVersion },
        } = data;
        if (cmsVersion) {
          setVersionNumber(cmsVersion);
        }
      })
      .catch(() => setStatusMessage('No version found'));
  }, [versionNumber, metricsUrl]);
  return <>{versionNumber || statusMessage}</>;
};

export default VersionNumber;
